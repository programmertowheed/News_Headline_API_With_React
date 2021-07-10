import React from 'react'

function getDateString(dateTimeStr){
    return new Date(dateTimeStr).toDateString()
}

const NewItem = React.forwardRef(({ item }, ref) => (
  <div ref={(el) => ref.push(el)} className="card mb-4">
    {item.urlToImage && (
      <img className="card-image-top" src={item.urlToImage} alt={item.title} />
    )}
    <div className="card-body">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#424242" }}
      >
        <h5 className="card-title">{item.title}</h5>
      </a>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#424242" }}
      >
        {item.content}
      </a>
      <div className="mt-2 d-flex align-items-center">
        <small>
          <strong>published at {getDateString(item.publishedAt)}</strong>
        </small>
        <div
          style={{
            padding: "0.25rem 0.5rem",
            background: "#ededed",
            borderRadius: "0.25rem",
            display: "inline-block",
            marginLeft: "auto",
          }}
        >
          <small>{item.source.name}</small>
        </div>
      </div>
    </div>
  </div>
));

const NewsList = React.forwardRef(({ news }, ref) => {
  return (
    <div>
      {news && news.length === 0 && <h4>There is No News</h4>}
      {news &&
        news.map((item) => <NewItem ref={ref} key={item.title} item={item} />)}
    </div>
  );
});

export default NewsList
