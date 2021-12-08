import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const courses = [{ id: 1, name: 'Next.js com Typescript' }];

  return res.json(courses);
};
