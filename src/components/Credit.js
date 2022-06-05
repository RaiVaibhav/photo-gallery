const LinkTag = ({ children, href }) => (
  <a
    className="no-underline outline-none"
    href={href}
    target="_blank"
    rel="noreferrer noopener"
  >
    {children}
  </a>
);

const getUserLink = (image) => {
  return `https://unsplash.com/@${image.user.username}`;
};

export const CreditsImage = ({ image }) => {
  if (!image) {
    return null;
  }

  const portfolioLink = getUserLink(image);

  return (
    <div
      className="flex items-center overflow-hidden absolute bottom-[20px] left-[10px] w-full"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <LinkTag href={portfolioLink}>
        <img
          className="border-r-[50%] my-0 mx-[10px]"
          src={image.user.profile_image.small}
          alt="Photographer profile"
        />
      </LinkTag>

      <LinkTag href={portfolioLink}>
        <div className="text-base font-semibold text-white opacity-80 duration-100 hover:opacity-100 drop-shadow">
          {image.user.first_name +
            " " +
            (image.user.last_name ? image.user.last_name : "")}
        </div>
      </LinkTag>
    </div>
  );
};

export const CreditsHeader = ({ image }) => {
  if (!image) {
    return null;
  }

  const portfolioLink = getUserLink(image);
  return (
    <div>
      <div className="flex items-center overflow-hidden w-auto p-2.5">
        <LinkTag href={portfolioLink}>
          <img
            className="border-r-[50%] my-0 mx-[10px]"
            src={image.user.profile_image.small}
            alt="Photographer profile"
          />
        </LinkTag>

        <LinkTag href={portfolioLink}>
          <div className="flex flex-col">
            <div className="text-white text-base font-semibold">
              {image.user.first_name +
                " " +
                (image.user.last_name ? image.user.last_name : "")}
            </div>
            <span className="text-black bg-opacity-70 text-xs m-0 p-0 hover:opacity-100">{"@" + image.user.username}</span>
          </div>
        </LinkTag>
      </div>
    </div>
  );
};
