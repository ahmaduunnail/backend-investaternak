import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProfile = async (
  email: string,
  nik: string,
  address: string,
  job: string,
  userId: string
) => {
  return await prisma.profile.create({
    data: {
      email,
      nik,
      address,
      job,
      userId,
    },
  });
};

export const fetchProfileByKeyword = async (searchTerm: string, page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;

  const users = await prisma.profile.findMany({
    where: {
      email: { search: searchTerm },
      nik: { search: searchTerm },
      address: { search: searchTerm },
      job: { search: searchTerm }
    },
    skip,
    take: pageSize,
  });

  const totalUsers = users.length

  return {
    users,
    totalUsers,
    totalPages: Math.ceil(totalUsers / pageSize),
    currentPage: page,
  };
}

export const fetchAllProfile = async (page: number, pasgeSize: number) => {
  const skip = (page - 1) * pasgeSize;

  const profiles = await prisma.profile.findMany({
    skip: skip,
    take: pasgeSize,
  });

  const totalProfiles = await prisma.profile.count();

  return {
    users: profiles,
    totalUsers: totalProfiles,
    totalPages: Math.ceil(totalProfiles / pasgeSize),
    currentPage: page,
  };
};

export const fetchProfileByEmail = async (email: string) => {
  return await prisma.profile.findUnique({
    where: {
      email,
    },
  });
};

export const fetchProfileByNIK = async (nik: string) => {
  return await prisma.profile.findUnique({
    where: {
      nik,
    },
  });
};

export const fetchProfileById = async (id: string) => {
  return await prisma.profile.findUnique({
    where: { id }
  })
}

export const updateProfile = async (
  id: string,
  data: Partial<{
    email: string,
    nik: string,
    address: string,
    job: string,
    userId: string
  }>
) => {
  return await prisma.profile.update({
    where: { id },
    data,
  });
};

export const deleteProfile = async (id: string) => {
  return await prisma.profile.delete({
    where: { id },
  });
};
