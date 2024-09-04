import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createArticle = async (
  title: string,
  content: string,
  recomendedFor: string
) => {
  return await prisma.article.create({
    data: {
      title,
      content,
      recomendedFor
    },
  });
};

export const fetchAllArticle = async (page: number, pageSize: number, deletedIncluded: boolean = false) => {
  const skip = (page - 1) * pageSize;

  const articles = await prisma.article.findMany({
    skip: skip,
    take: pageSize,
    where: { deleted: deletedIncluded ? undefined : false },
    omit: { deleted: !deletedIncluded }
  });

  const totalArticles = await prisma.article.count();

  return {
    articles,
    totalArticles,
    totalPages: Math.ceil(totalArticles / pageSize),
    currentPage: page,
  };
};

export const fetchArticleByKeyword = async (searchTerm: string, page: number, pageSize: number, deletedIncluded: boolean = false) => {
  const skip = (page - 1) * pageSize;

  const articles = await prisma.article.findMany({
    where: {
      title: { search: searchTerm },
      recomendedFor: { search: searchTerm },
      deleted: deletedIncluded ? false : undefined
    },
    omit: {
      deleted: !deletedIncluded
    },
    skip,
    take: pageSize,
  });

  const totalArticles = articles.length

  return {
    articles,
    totalArticles,
    totalPages: Math.ceil(totalArticles / pageSize),
    currentPage: page,
  };
}

export const fetchArticleByRecomendedFor = async (recomendedFor: string, deletedIncluded: boolean = false) => {
  return await prisma.article.findMany({
    where: {
      recomendedFor,
      deleted: deletedIncluded ? false : undefined
    },
    omit: {
      deleted: !deletedIncluded
    }
  });
};

export const getArticleById = async (id: string, deletedIncluded: boolean = false) => {
  return await prisma.article.findUnique({ where: { id, deleted: deletedIncluded ? false : undefined }, omit: { deleted: !deletedIncluded } })
}

export const updateArticle = async (
  id: string,
  data: Partial<{
    title: string,
    content: string,
    recomendedFor: string,
    like: number,
    deleted: boolean
  }>
) => {
  return await prisma.article.update({
    where: { id },
    data,
  });
};

export const softDeleteArticle = async (id: string) => {
  return await prisma.article.update({
    where: { id },
    data: {
      deleted: true
    }
  })
}

export const deleteArticle = async (id: string) => {
  return await prisma.article.delete({
    where: { id },
  });
};
