import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  room = [
    [
      { user: { nickname: 'dsfjsadiofjsdof' }, content: 'content' },
      { user: { nickname: 'sadhgofisdajgiosdjg' }, content: 'chatchat' },
    ],
    [
      { user: { nickname: 'wweeeeeee' }, content: 'aaaaaaaaaaaaaaa' },
      { user: { nickname: 'qeqeqeqeqeqe' }, content: 'gggggg' },
    ],
  ];
  getHello(id: number) {
    return this.room[id];
  }
}
