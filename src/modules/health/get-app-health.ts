
export const getAppHealth = () => {
    return {
        status: 'OK',
        uptime: process.uptime(),
        timestamp: Date.now()
    }
}