export interface DetailNewsResponse {
  code: string;
  message: string;
  result: {
    title: string;
    content: string;
    category: string;
    author: string;
    createdAt: string;
    imageList: { imageUrl: string }[];
    views: number;
  };
}
