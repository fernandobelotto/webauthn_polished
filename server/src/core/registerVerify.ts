import { VerifiedRegistrationResponse, verifyRegistrationResponse } from "@simplewebauthn/server";
import { Request, Response } from "express";
import { prisma } from "../clients/prisma";
import { origin, rpID } from "../constants";


export const registerVerify = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  const expectedChallenge = user?.currentChallenge;

  if (!expectedChallenge) {
    return res.status(400).send({ error: "Challenge not found" });
  }

  let verification: VerifiedRegistrationResponse;
  try {
    verification = await verifyRegistrationResponse({
      response: req.body.optionsResponse,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: error.message });
  }

  const { verified } = verification;
  const { registrationInfo } = verification;

  const { credentialPublicKey, credentialID, counter } = registrationInfo;

  await prisma.authenticator.create({
    data: {
      credentialID: credentialID.toString(),
      credentialPublicKey: credentialPublicKey.toString(),
      counter,
      credentialBackedUp: false,
      credentialDeviceType: "unknown",
      userId: user?.id,
    },
  });

  res.json({ verified, registrationInfo });
};
