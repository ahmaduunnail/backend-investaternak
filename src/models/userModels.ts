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

export const fetchAllUser = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;

  const users = await prisma.user.findMany({
    skip: skip,
    take: pageSize,
  });

  const totalUsers = await prisma.user.count();

  return {
    users,
    totalUsers,
    totalPages: Math.ceil(totalUsers / pageSize),
    currentPage: page,
  };
};

export const fetchUserByKeyword = async (searchTerm: string, page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize;

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: searchTerm.toLowerCase() } },
        { name: { contains: searchTerm.toLowerCase() } },
      ],
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

export const fetchUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({ where: { id } })
}

export const updateUser = async (
  id: string,
  data: Partial<{
    username: string;
    password: string;
    name: string;
    imageProfileUrl: string;
    role: Role;
  }>
) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};
