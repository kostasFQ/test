import { useCallback } from 'react';
import axios from 'axios';

const headers = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };

const useApi = () => {
  const get = useCallback(
    async<T = void>(path: string): Promise<T> => (await axios.get(path, headers)).data,
    []
  );
  const post = useCallback(
    async<ReqT, ResT = void>(path: string, body: ReqT): Promise<ResT> => (await axios.post(path, body, headers)).data,
    []
  );
  const put = useCallback(async<T>(path: string, body: T): Promise<T> => (await axios.put(path, body, headers)).data,
    []
  );
  const del = useCallback(
    async<T>(path: string): Promise<T> => (await axios.delete(path, headers)).data,
    []
  );

  return { get, post, put, del };
};

export default useApi;
