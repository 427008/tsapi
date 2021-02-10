import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import {User, UserSec} from '../entity/User';

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user = await getRepository(User).findOne(req.params.id);
  if (typeof user != 'undefined') {
    return res.json({ success: true, data: user});
  }
  return res.json({ success: false, message:'not found'});
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUsers = getRepository(User).create(req.body);
  const newUser = newUsers.pop();
  if (typeof newUser == 'undefined')
    return res.json({success: false, message: 'wrong input'});

  const userExists = await getRepository(User).findOne({email: newUser.email});
  if (typeof userExists != 'undefined')
    return res.json({success: false, message: 'user is already exists'});

  const newUsersSec = getRepository(UserSec).create(req.body);
  const newUserSec = newUsersSec.pop();
  if (typeof newUserSec === 'undefined' ||
      typeof newUserSec.email === 'undefined' || typeof newUserSec.password === 'undefined' ||
      newUserSec.email.length < 5  || newUserSec.password.length < 9) {
    return res.json({success: false, message: 'wrong input'});
  }

  const user = await getRepository(User).save(newUser);
  const userSec = await getRepository(UserSec).save(newUserSec);
  return res.json({success: true, data: user});
};

export const validateUser = async (
    req: Request,
    res: Response
): Promise<Response> => {
  const testUser = getRepository(UserSec).create(req.body).pop();
  if (typeof testUser != 'undefined' &&
      typeof testUser.email != 'undefined' && typeof testUser.password != 'undefined') {
    const user = await getRepository(UserSec).findOne({email: testUser.email});
    if (typeof user != 'undefined' && user.password == testUser.password) {
      return res.json({ success: true, data: 'user'});
    }
  }
  return res.json({ success: false });
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userSource = await getRepository(User).findOne(req.params.id);
  if (userSource) {
    getRepository(User).merge(userSource, req.body);
    const user = await getRepository(User).save(userSource);
    return res.json({ success: true, data: user});
  }
  return res.json({success: false, message: 'Not User found'});
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const userSource = await getRepository(User).findOne(req.params.id);
  if (userSource) {
    userSource.isDeleted = true;
    const user = await getRepository(User).save(userSource);
    return res.json({ success: true });
  }
  return res.json({success: false, message: 'Not User found'});
};

export const restoreUser = async (req: Request, res: Response): Promise<Response> => {
  const userSource = await getRepository(User).findOne(req.params.id);
  if (userSource) {
    userSource.isDeleted = false;
    const user = await getRepository(User).save(userSource);
    return res.json({ success: true });
  }
  return res.json({success: false, message: 'Not User found'});
};
