import { NextFunction, Request, Response } from "express";
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.Token;

    if (token) {
      try {
        if (process.env.JWT_SECRET) {
          await jwt.verify(token, process.env.JWT_SECRET);
          next();
        }
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized");
      }
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        await jwt.verify(token, process.env.JWT_SECRET);
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

const superAdminProtect = asyncHandler(
  
  async (req: Request, res: Response, next: NextFunction) => {
    
    let token = req.cookies.Token;

    if (token) {
      try {
        if (process.env.SECRET_PASS) {
          const superAdminPayload = await jwt.verify(token, process.env.SECRET_PASS);
          //const adminPayload = await jwt.verify(token, process.env.SECRET_PASS);
          console.log(superAdminPayload)
          if((superAdminPayload) ){
            next()
          }
          
        }
      } catch (error) {
        res.status(401);
        throw new Error(" Cookie Not authorized as Admin");
      }
    } else if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const superAdminPayload = await jwt.verify(token, process.env.SECRET_PASS);
        const adminPayload = await jwt.verify(token, process.env.ADMIN_PASS);
        // console.log(`${JSON.stringify(adminP)}}`)
        if((superAdminPayload  && (superAdminPayload.user.position != "user")) ){
          next()
        } 
        
      } catch (error) {
        res.status(401);
        throw new Error("Header Not authorized as Super User");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Provide token for authentication");
    }
  }
);

const adminProtect = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.Token;

    if (token) {
      try {
          
        const superAdminPayload = await jwt.verify(token, process.env.SECRET_PASS);
        const adminPayload = await jwt.verify(token, process.env.ADMIN_PASS);
        console.log(`${superAdminPayload}, ${adminPayload}`)
        if((superAdminPayload  && (superAdminPayload.user.position != "user")) || (adminPayload  && (adminPayload.user.position != "user"))){
          next();
        }
        
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized as Admin");
      }
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        const superAdminPayload = await jwt.verify(token, process.env.SECRET_PASS);
        const adminPayload = await jwt.verify(token, process.env.ADMIN_PASS);
        console.log(`${superAdminPayload}, ${adminPayload}`)
        if((superAdminPayload  && (superAdminPayload.user.position != "user")) || (adminPayload  && (adminPayload.user.position != "user"))){
          next();
        }
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized as Super User");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Provide token for authentication");
    }
  }
);

module.exports = { protect, superAdminProtect, adminProtect };
