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
      User: {
        connect: { id: userId }
      }
    },
  });
};

export const fetchProfileByKeyword = async (searchTerm: string, page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;

  const profiles = await prisma.profile.findMany({
    where: {
      email: { search: searchTerm },
      nik: { search: searchTerm },
      address: { search: searchTerm },
      job: { search: searchTerm }
    },
    skip,
    take: pageSize,
  });

  const totalProfiles = profiles.length

  return {
    profiles,
    totalProfiles,
    totalPages: Math.ceil(totalProfiles / pageSize),
    currentPage: page,
  };
}

export const fetchAllProfile = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;

  const profiles = await prisma.profile.findMany({
    skip: skip,
    take: pageSize,
  });

  const totalProfiles = await prisma.profile.count();

  return {
    profiles,
    totalProfiles,
    totalPages: Math.ceil(totalProfiles / pageSize),
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
  }>,
  userId: string | undefined
) => {
  return await prisma.profile.update({
    where: { id },
    data: {
      ...data,
      User: userId ? { connect: { id: userId } } : undefined
    },
  });
};

export const deleteProfile = async (id: string) => {
  return await prisma.profile.delete({
    where: { id },
  });
};
