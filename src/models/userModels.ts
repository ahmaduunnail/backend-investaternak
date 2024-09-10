import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (
  username: string,
  password: string,
  name: string,
  imageProfileUrl: string,
  role: Role
) => {
  return await prisma.user.create({
    data: {
      username,
      password,
      name,
      imageProfileUrl,
      role,
    },
  });
};

export const fetchAllUser = async (page: number, pageSize: number, deletedIncluded: boolean = false) => {
  const skip = (page - 1) * pageSize;

  const users = await prisma.user.findMany({
    skip: skip,
    take: pageSize,
    where: { deleted: deletedIncluded ? undefined : false },
    omit: { password: true, deleted: !deletedIncluded }
  });

  const totalUsers = await prisma.user.count();

  return {
    users,
    totalUsers,
    totalPages: Math.ceil(totalUsers / pageSize),
    currentPage: page,
  };
};

export const fetchUserByKeyword = async (searchTerm: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
  const skip = (page - 1) * pageSize;

  const users = await prisma.user.findMany({
    where: {
      username: { search: searchTerm },
      name: { search: searchTerm },
      deleted: deletedIncluded ? false : undefined
    },
    omit: {
      password: true,
      deleted: !deletedIncluded
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

export const fetchUserByUsername = async (username: string, includePassword: boolean = false) => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
    omit: {
      password: !includePassword
    }
  });
};

export const fetchUserById = async (id: string, includePassword: boolean = false) => {
  return await prisma.user.findUnique({ where: { id }, omit: { password: !includePassword } })
}

export const updateUser = async (
  id: string,
  data: Partial<{
    username: string;
    password: string;
    name: string;
    imageProfileUrl: string;
    role: Role,
    deleted: boolean
  }>
) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const softDeleteUser = async (id: string) => {
  return await prisma.user.update({
    where: { id },
    data: {
      deleted: true
    }
  })
}

// export const deleteUser = async (id: string) => {
//   return await prisma.user.delete({
//     where: { id },
//   });
// };
