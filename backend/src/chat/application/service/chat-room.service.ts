import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CareApplication } from "src/care-application/domain/care-application.entity";
import { CareApplicationRepository } from "src/care-application/domain/care-application.repository";
import { GetApplicationStatusDto } from "src/care-application/interface/dto/get-application-status.dto";
import { ChatRoom } from "src/chat/domain/entity/chat-room.entity";
import { ApplicationStatus } from "src/chat/domain/enum/application-status.enum";
import { ChatRoomRepository } from "src/chat/domain/repository/chat-room.repository";
import { GetRoomListDto } from "src/chat/interface/dto/get-room-list.dto";
import { RoomListData } from "src/chat/interface/dto/room-list-data";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { GetNameDto } from "src/user-auth-common/domain/interface/get-name.dto";
import { UserRepository } from "src/user-auth-common/domain/repository/user.repository";

@Injectable()
export class ChatRoomService {
    constructor(
        @InjectRepository(ChatRoom)
        private readonly roomRepository: ChatRoomRepository,
        @InjectRepository(CareApplication)
        private readonly applicationRepository: CareApplicationRepository,
        @InjectRepository(User)
        private readonly userRepository: UserRepository 
    ) {}

    async getList(userId: number): Promise<GetRoomListDto []> {

        /* 사용자가 속한 방 목록 조회 */
        const roomList = await this.roomRepository.findByUserId(userId); 

        /* 각 방의 상대방 닉네임, 최신의 신청서 상태를 조회하기 위해 id들 Set */
        const [applicationIdList, partnerIdList] = this.getApplicationAndPartnerIdList(roomList); 

        /* 각 방에 속한 id들로 다른 Repository 조회 */
        const [partnerNameList, applicationStatusList] = await Promise.all([
            this.userRepository.findNamesByIds(partnerIdList),
            this.applicationRepository.findStatusByIds(applicationIdList)
        ]);

        /* 가져온 데이터들 사용자 화면에 맞게 합쳐서 return */
        return this.toClientDto(roomList, partnerNameList, applicationStatusList);
    }

    /* 각 방의 사용자 id, 신청서 id들을 배열에 묶어 return */
    private getApplicationAndPartnerIdList(roomList: RoomListData []): number[][] {
        const [applicationIdList, partnerIdList] = [[], []];
        roomList.map( room => {
            const [applicationId, partnerId] = [room.applicationId, room.chatPartnerId];
            applicationIdList.push(applicationId);
            partnerIdList.push(partnerId);
        });
        return [applicationIdList, partnerIdList]
    }

    /* 기존 방 데이터들과 각 방에 맞는 닉네임, 신청서 상태 프론트엔드 포맷으로 변환 */
    private toClientDto(
        roomList: RoomListData [], 
        partnerNameList: GetNameDto [], 
        applicationStatusList: GetApplicationStatusDto []
    ): GetRoomListDto [] {
        /* 각 방 목록 데이터에는 사용자 id와 신청서 id가 있기때문에 찾기 위해 Key로 */
        const [partnerNameMap, applicationStatusMap] = [
            new Map<number, string>(), 
            new Map<number, ApplicationStatus>()
        ];

        for( let i = 0; i < roomList.length; i++ ) {
            partnerNameMap.set(partnerNameList[i].id, partnerNameList[i].name);
            applicationStatusMap.set(applicationStatusList[i].id, applicationStatusList[i].status);
        };
        
        const combinedList = [];

        for( const room of roomList ) {
            const combinedRoom =  this.combine(
                room, 
                partnerNameMap.get(room.chatPartnerId), 
                applicationStatusMap.get(room.applicationId)
            );
            combinedList.push(combinedRoom);
        }
        return combinedList;
    }

    private combine(room: RoomListData, partnerName: string, applicationStatus: ApplicationStatus): GetRoomListDto {
        return { 
            ...room, 
            chatPartnerName: partnerName, 
            recentApplicationStatus: this.applicationStatusToString(applicationStatus) 
        };
    }

    /* 신청서 Enum을 문자열로 */
    private applicationStatusToString(applicationStatus: ApplicationStatus): string {
        switch(applicationStatus) {
            case ApplicationStatus.REQUESTED:
                return '프로필 확인하지 않음';
            case ApplicationStatus.WATCHED:
                return '프로필 확인함';
            case ApplicationStatus.ACCESSED:
                return '간병신청이 수락됨';
            case ApplicationStatus.REJECTED:
                return '간병신청이 거절됨';
        }
    }
}