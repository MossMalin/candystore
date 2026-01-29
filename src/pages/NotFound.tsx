import notFound from '../assets/images/404.png';
const NotFound = () => {
  return (
    <>
      <h1>The page could not be found</h1>
      <p>
        <a href="/">Back to homepage</a>
      </p>
      <img src={notFound} width="100%" />
    </>
  );
};

export default NotFound;
