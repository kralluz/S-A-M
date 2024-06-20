import "dotenv/config";
import AppError from "../Errors/error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ZodTypeAny } from "zod";
import User from "../entities/Users.entitie";
import { usersRepo } from "../repositories/users.repositorie";

export const bodyValidation =
    (schema: ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction): void => {
        if(req.body.value) req.body.value = Number(req.body.value);
        req.body = schema.parse(req.body);
        return next();
    };

export const verifyAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { admin } = res.locals.decoded;

    if (!admin) throw new AppError("Insufficient permission", 403);

    return next();
};

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authorization = req.headers.authorization;
    if (!authorization) throw new AppError("Missing bearer token", 401);

    const token: string = authorization.split(" ")[1];
    const decoded = verify(token, process.env.SECRET_KEY!);

    res.locals = { ...res.locals, decoded };
    return next();
};

export const verifyPermissions = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    const { sub, admin } = res.locals.decoded;

    if (admin) return next();

    if (id !== sub) throw new AppError("Insufficient permission", 403);

    return next();
};

export const verifyId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user: User | null = await usersRepo.findOneBy({
        id: Number(req.params.id),
    });

    if (!user) {
        throw new AppError("User not found", 404);
    }
    res.locals = { ...res.locals, user };

    next();
};
