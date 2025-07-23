export class Dialogue {
    id: string;
    optionText?: string; // Text for option that navigates to this dialogue
    difficulty?: number;
    content: FancyText[];
    options: SuccessFailure[];
}

export class SuccessFailure {
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