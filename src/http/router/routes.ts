import { Router } from "express";
import { getAppHealth } from "~/modules/health/get-app-health";

export const routes = () => {
    const router = Router();

    router.get('/', (req, res) => {
        res.send('Hello World!');
    });

    router.get('/health', (req, res) => {
        const health = getAppHealth();
        res.json(health);
    })

    return router;
}