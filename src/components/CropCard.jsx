function CropCard({ crop }) {

  return (

    <div className="card">

      <img
        src={crop.image}
        alt={crop.title}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.src =
            "https://via.placeholder.com/400x250?text=Image+not+available";
        }}
      />

      <h2>{crop.title}</h2>

      <p>
        {crop.description}
      </p>

      {crop.season && (
        <p>
          <strong>Season:</strong>
          {" "}
          {crop.season}
        </p>
      )}

      <p>
        <strong>Soil:</strong>
        {" "}
        {Array.isArray(crop.soil)
          ? crop.soil.join(", ")
          : crop.soil}
      </p>

      <p>
        <strong>Irrigation:</strong>
        {" "}
        {Array.isArray(crop.irrigation)
          ? crop.irrigation.join(", ")
          : crop.irrigation}
      </p>

      {crop.duration && (
        <p>
          <strong>Duration:</strong>
          {" "}
          {crop.duration}
        </p>
      )}

    </div>

  );
}

export default CropCard;