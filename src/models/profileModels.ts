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

export const fetchProfileByKeyword = async (searchTerm: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
  const skip = (page - 1) * pageSize;

  const profiles = await prisma.profile.findMany({
    where: {
      email: { search: searchTerm },
      nik: { search: searchTerm },
      address: { search: searchTerm },
      job: { search: searchTerm },
      deleted: deletedIncluded
    },
    omit: {
      deleted: !deletedIncluded
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

export const fetchAllProfile = async (page: number, pageSize: number, deletedIncluded: boolean = false) => {
  const skip = (page - 1) * pageSize;

  const profiles = await prisma.profile.findMany({
    where: {
      deleted: deletedIncluded
    },
    omit: {
      deleted: !deletedIncluded
    },
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
    relationLoadStrategy: 'join',
    where: {
      email,
    },
    include: {
      User: true
    }
  });
};

export const fetchProfileByNIK = async (nik: string) => {
  return await prisma.profile.findUnique({
    relationLoadStrategy: 'join',
    where: {
      nik,
    },
    include: {
      User: true
    }
  });
};

export const fetchProfileById = async (id: string, deletedIncluded: boolean = false) => {
  return await prisma.profile.findUnique({
    relationLoadStrategy: 'join',
    where: { id, deleted: deletedIncluded },
    omit: {
      deleted: !deletedIncluded
    },
    include: {
      User: true
    }
  })
}

export const updateProfile = async (
  id: string,
  data: Partial<{
    email: string,
    nik: string,
    address: string,
    job: string,
    deleted: boolean
  }>,
  userId?: string
) => {
  return await prisma.profile.update({
    where: { id },
    data: {
      ...data,
      User: userId ? { connect: { id: userId } } : undefined
    },
  });
};

export const softDeleteProfile = async (id: string) => {
  return await prisma.profile.update({
    where: { id },
    data: {
      deleted: true
    }
  })
}

// export const deleteProfile = async (id: string) => {
//   return await prisma.profile.delete({
//     where: { id },
//   });
// };
