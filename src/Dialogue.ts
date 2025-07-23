export class Dialogue {
    id: string;
    difficulty?: number;
    content: FancyText[];
    options: SuccessFailure[];
}

export class SuccessFailure {
    optionText: string;
    success: string;
    failure?: string;
}

export class FancyText {
    text: string;
    pov?: string;
    skill?: string;
}

export class Profile {
    id: string;
    color?: string;
    pfp?: string;
}