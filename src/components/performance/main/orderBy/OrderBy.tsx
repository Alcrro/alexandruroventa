export default function OrderBy({ item, params }: { item: any; params: any }) {
  return (
    <>
      <div className="category crt-container">
        <div id="" className="crt">
          <div className="header-name"></div>
          <span className="asc"></span>
          <span className="desc"></span>
        </div>
        <div>{item.uniqueNumberByCategory}</div>
      </div>
      <div className="category language-learnt-container">
        <div id="" className="language-learnt">
          <div className="header-name"></div>
          <span className="asc"></span>
          <span className="desc"></span>
        </div>
        <div>{item.languageType}</div>
      </div>
      <div className="category contentTitle-container">
        <div id="" className="contentTitle">
          <div className="header-name"></div>
          <span className="asc"></span>
          <span className="desc"></span>
        </div>
        <div>{item.contentTitle}</div>
      </div>
      <div className="category contentDescription-container">
        <div id="" className="contentDescription">
          <div className="header-name"></div>
          <span className="asc"></span>
          <span className="desc"></span>
        </div>
        <div>{item.contentDescription}</div>
      </div>
      <div className="category codVersion-container">
        <div id="" className="codVersion">
          <div className="header-name"></div>
          <span className="asc"></span>
          <span className="desc"></span>
        </div>
        <div>{item.codeversions_details.codVersion}</div>
      </div>
      <div className="category dateVersion-container">
        <div id="" className="dateVersion">
          <div className="header-name"></div>
          <span className="asc"></span>
          <span className="desc"></span>
        </div>
        <div suppressHydrationWarning>
          {new Date(
            item?.codeversions_details.dateVersion
          )?.toLocaleDateString()}
        </div>
      </div>
    </>
  );
}
