export class JQBXFirst {
    room: JQBXRoom;
    track: JQBXTrack
    user: JQBXUser;
}

export class JQBXRoom {
    handle: string;
    title: string;
}

export class JQBXTrack {
    startedAt: Date;
    thumbsUp: number;
    thumbsDown: number;
    userUri: string;
    username: string;
}

export class JQBXUser {
    username: string;
    uri: string;
    image: string;
}