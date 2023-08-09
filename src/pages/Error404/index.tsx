import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import style from './index.module.scss';

export const Error404 = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <p className={style.error}>
        {error.status} {error.statusText}
      </p>
    );
  }

  if (error instanceof Error) {
    return <p className={style.error}>{error.message || 'Unknown Error'}</p>;
  }
  return null;
};
