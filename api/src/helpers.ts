export const separateObject = (obj: object): { values: string[], keys: string[] } => {
  const initial = { values: [], keys: [] };

  return Object.entries(obj).reduce((a, c) => {
    const [key, value] = c;
    a.keys.push(key);
    a.values.push(value);

    return a;
  }, initial);
};

export const separateToValuesAndKeys = (data: Record<string, string>, keys: string[]): [string[], string[], string[]] => {
  return Object.entries(data).reduce((a, c) => { //Tuple
    const [nv, kv, kn] = a;
    if (keys.includes(c[0])) { kv.push(c[1]) };
    if (!keys.includes(c[0])) {
      nv.push(c[1]);
      kn.push(c[0]);
    }

    return a;
  }, [[], [], []]);
};
