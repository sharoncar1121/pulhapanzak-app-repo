export interface userDto {
    uid:string;
    name: string;
    apellidos: string;
    email: string;
    DNI: string;
    password: string;
    phoneNumber: string;
    photoUrl: string;
    birth: Date | null;
    deviceId: string | null;
}