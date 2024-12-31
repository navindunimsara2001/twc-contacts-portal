export interface RequestWithUser extends Request {
    user: any;  // Use a specific type if possible, e.g., { id: number, email: string }
}