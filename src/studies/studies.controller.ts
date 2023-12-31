import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudiesService } from './studies.service';
import { UserData } from '../commons';
import { User } from '../users';
import {
  CreateAnnouncementDto,
  CreateInquiryDto,
  CreateInquiryResponseDto,
  CreateStudyDto,
  UpdateInquiryDto,
  UpdateStudyDto,
} from './dto';

@ApiTags('Studies')
@Controller('studies')
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  /**
   * 스터디
   */
  // TODO: 스터디 생성
  @Post()
  createStudy(@UserData() user: User, @Body() createStudyDto: CreateStudyDto) {
    return this.studiesService.createStudy(user, createStudyDto);
  }

  @Get('/offset')
  fetchStudiesWithOffset(
    @Query('limit') limit = 20, // 한번에 몇개 보내줄건가?
    @Query('offset') offset = 0, // 어디서부터 시작할건가? - 이것만 조절하면됨
    @Query('filter') filter: string,
  ) {
    return this.studiesService.fetchStudiesWithOffset(offset, limit, filter);
  }

  // TODO: 스터디 전체 조회
  // FIXME: 관리자 권한 부여
  @Get()
  fetchAllStudies() {
    return this.studiesService.fetchAllStudies();
  }

  // TODO: 스터디 단일 조회
  @Get(':id')
  fetchStudy(@Param('id') id: number) {
    return this.studiesService.fetchStudy(id);
  }

  // TODO: 스터디 수정
  @Patch(':id')
  updateStudy(
    @Param('id') id: number,
    @UserData() user: User,
    @Body() updateStudyDto: UpdateStudyDto,
  ) {
    return this.studiesService.updateStudy(id, user, updateStudyDto);
  }

  // TODO: 스터디 삭제
  @Delete(':id')
  deleteStudy(@Param('id') id: number, @UserData() user: User) {
    return this.studiesService.softDeleteStudy(id, user);
  }

  // TODO: 스터디 복구
  @Get(':id/restore')
  restoreStudy(@Param('id') id: number, @UserData() user: User) {
    return this.studiesService.restoreStudy(id, user);
  }

  /**
   *  스터디 북마크
   */
  @Get(':studyId/bookmark')
  bookmarkStudy(@Param('studyId') studyId: number, @UserData() user: User) {
    return this.studiesService.bookmarkStudy(studyId, user);
  }

  /**
   * 스터디 신청
   */
  // 스터디 신청여부 확인
  @Get('attend/check/:id')
  checkStudyAttendRequest(@Param('id') id: number, @UserData() user: User) {
    return this.studiesService.checkStudyAttendRequest(id, user);
  }

  // TODO: 스터디 신청 수락
  @Post('attend/accept')
  acceptStudyAttend(
    @Body() { fromUser, studyId }: { fromUser: User; studyId: number },
  ) {
    return this.studiesService.acceptStudyAttend(fromUser, studyId);
  }

  // TODO: 스터디 모집종료
  @Get(':id/close')
  closeStudyRecruit(@Param('id') id: number, @UserData() user: User) {
    return this.studiesService.closeStudyRecruit(id, user);
  }

  /** 스터디 공지 */
  // TODO: 스터디 공지 생성
  @Post(':studyId/announcement')
  createAnnouncement(
    @Param('studyId') studyId: number,
    @UserData() user: User,
    @Body() createAnnouncementDto: CreateAnnouncementDto,
  ) {
    return this.studiesService.createAnnouncement(
      studyId,
      user,
      createAnnouncementDto,
    );
  }

  // TODO: 단일스터디 공지 모두 불러오기
  @Get(':studyId/announcement')
  fetchStudyAnnouncementAll(@Param('studyId') studyId: number) {
    return this.studiesService.fetchStudyAnnouncementAll(studyId);
  }

  // TODO: 단일스터디 공지 하나만 불러오기
  @Get(':studyId/announcement/:announcementId')
  fetchOneAnnouncement(
    @Param('studyId') studyId: number,
    @Param('announcementId') announcementId: number,
  ) {
    return this.studiesService.fetchOneAnnouncement(studyId, announcementId);
  }

  // TODO: 스터디 공지 수정
  @Patch(':studyId/announcement/:announcementId')
  updateAnnouncement(
    @Param('studyId') studyId: number,
    @Param('announcementId') announcementId: number,
    @UserData() user: User,
    @Body() createAnnouncementDto: CreateAnnouncementDto,
  ) {
    return this.studiesService.updateAnnouncement(
      studyId,
      announcementId,
      user,
      createAnnouncementDto,
    );
  }

  // TODO: 스터디 공지 삭제
  @Delete(':studyId/announcement/:announcementId')
  deleteAnnouncement() {
    return this.studiesService.deleteAnnouncement();
  }

  /**
   * 스터디 문의
   */
  // TODO: 스터디 문의 생성
  @Post(':studyId/inquiry')
  createStudyInquiry(
    @Body() createInquiryDto: CreateInquiryDto,
    @Param('studyId') studyId: number,
    @UserData() user: User,
  ) {
    return this.studiesService.createStudyInquiry(
      createInquiryDto,
      studyId,
      user,
    );
  }

  //TODO: 스터디 문의 답변달기
  @Post(':studyId/inquiry/:inquiryId')
  responseStudyInquiry(
    @Body() createInquiryResponseDto: CreateInquiryResponseDto,
    @Param('studyId') studyId: number,
    @Param('inquiryId') inquiryId: number,
    @UserData() user: User,
  ) {
    return this.studiesService.responseStudyInquiry(
      createInquiryResponseDto,
      studyId,
      inquiryId,
      user,
    );
  }

  // TODO: 스터디 문의 답변 수정
  // TODO: 스터디 문의 답변 삭제
  // TODO: 스터디 문의 답변 불러오기

  // TODO: 단일 스터디 문의 전체 조회
  @Get(':studyId/inquiry')
  fetchOneStudyInquires(@Param('studyId') studyId: number) {
    return this.studiesService.fetchOneStudyInquires(studyId);
  }

  // TODO: 스터디 문의 수정
  @Patch(':studyId/inquiry/:inquiryId')
  updateStudyInquiry(
    @Param('studyId') studyId: number,
    @Param('inquiryId') inquiryId: number,
    @Body() updateInquiryDto: UpdateInquiryDto,
  ) {
    return this.studiesService.updateStudyInquiry(
      studyId,
      inquiryId,
      updateInquiryDto,
    );
  }

  // TODO: 스터디 문의 삭제
  @Delete(':studyId/inquiry/:inquiryId')
  deleteStudyInquiry(
    @Param('studyId') studyId: number,
    @Param('inquiryId') inquiryId: number,
    @UserData() user: User,
  ) {
    return this.studiesService.deleteStudyInquiry(studyId, inquiryId, user);
  }

  // TODO: 스터디 문의 전체 조회
  // FIXME: 관리자 권한
  // URL 구분하려면 id 붙혀야함
  @Get(':id/inquiries')
  fetchAllStudyInquiries() {
    return this.studiesService.fetchStudyInquiriesAll();
  }

  // TODO: 스터디 문의 단일 조회
  // FIXME: 관리자 권한 추가하기
  @Get(':studyId/inquiry/:inquiryId')
  fetchOneStudyInquiry(
    @Param('studyId') studyId: number,
    @Param('inquiryId') inquiryId: number,
  ) {
    return this.studiesService.fetchOneStudyInquiry(studyId, inquiryId);
  }
}
