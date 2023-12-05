export type Client = {
    id: number | null;
    firstName: string;
    lastName: string;
    birthday: Date;
    paidTill: Date;
    phoneNumber: string;
    curatorId: number | null; // Или другой тип, если необходимо
    createdAt: Date;
    updatedAt: Date;
    Curator: Curator
};

export type Task = {
    id: number;
    text: string;
    deadline: Date;
    isCompleted: boolean;
    curatorId: number | null;
    createdAt: Date;
    updatedAt: Date;
};

export type Curator = {
    id: number;
    login: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
};

export type Stata = {
    height: number,
    weight: number,
    chest: number,
    waist: number,
    hips: number,
    BMI: number,
    clientId: number,
    createdAt: Date,
};

