declare global {
    namespace NodeJS {
        interface Request {
            user?: Record<string, any>
        }
    }
}
