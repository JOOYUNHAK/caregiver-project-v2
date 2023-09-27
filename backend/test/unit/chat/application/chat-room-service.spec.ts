import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm";
import { CareApplication } from "src/care-application/domain/care-application.entity";
import { CareApplicationRepository } from "src/care-application/domain/care-application.repository";
import { ChatRoomService } from "src/chat/application/service/chat-room.service";
import { ChatRoom } from "src/chat/domain/entity/chat-room.entity";
import { ChatRoomRepository } from "src/chat/domain/repository/chat-room.repository";
import { User } from "src/user-auth-common/domain/entity/user.entity";
import { UserRepository } from "src/user-auth-common/domain/repository/user.repository";
import { MockCareApplicationRepo } from "test/unit/__mock__/care-application/repository.mock";
import { MockChatRoomRepository } from "test/unit/__mock__/chat/repository.mock";
import { RoomListData } from "src/chat/interface/dto/room-list-data";
import { GetNameDto } from "src/user-auth-common/domain/interface/get-name.dto";
import { GetApplicationStatusDto } from "src/care-application/interface/dto/get-application-status.dto";
import { MockUserRepository } from "test/unit/__mock__/user-auth-common/repository.mock";

describe('ChatRoomService(채팅방 서비스) Test', () => {
    let chatRoomService: ChatRoomService;
    let userRepository: UserRepository;
    let roomRepository: ChatRoomRepository;
    let applicationRepository: CareApplicationRepository;

    beforeAll(async () => {

        const module = await Test.createTestingModule({
            providers: [
                ChatRoomService,
                MockUserRepository,
                MockChatRoomRepository,
                MockCareApplicationRepo
            ]
        }).compile();

        chatRoomService = module.get(ChatRoomService);
        userRepository = module.get(getRepositoryToken(User));
        roomRepository = module.get(getRepositoryToken(ChatRoom));
        applicationRepository = module.get(getRepositoryToken(CareApplication));
    });

    describe('getList()', () => {
        const [roomList, nameList, statusList] = [[], [], []];

        /* 방  */
        beforeAll(() => {
            for( let i= 1; i <= 3; i++ ) {
                const roomStub = RoomListData.of(i, i, i);
                const nameStub = GetNameDto.of(i, `테스트${i}`);
                const applicationStatusStub = GetApplicationStatusDto.of(i);
                
                roomList.push(roomStub);
                nameList.push(nameStub);
                statusList.push(applicationStatusStub);
            };
        })

        it('조회된 방 목록의 데이터들로 다른 데이터들과 함게 조회되어 반환되는지 확인', async () => {
            jest.spyOn(roomRepository, 'findByUserId').mockResolvedValueOnce(roomList);

            jest.spyOn(userRepository, 'findNamesByIds').mockResolvedValueOnce(nameList);
            jest.spyOn(applicationRepository, 'findStatusByIds').mockResolvedValueOnce(statusList);

            const result = await chatRoomService.getList(1);

            result.map( (eachRoomData, index) => {
                expect(eachRoomData.chatPartnerName).toEqual(nameList[index].name);
                expect(eachRoomData.recentApplicationStatus).toEqual("프로필 확인하지 않음");
            });
        });
    })
})