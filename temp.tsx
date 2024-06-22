<div className="p-4 px-20 pt-10">
  <div className="grid gap-2">
    <div className="flex w-full h-auto pt-[4rem] px-[10rem] gap-4 justify-center">
      <div>
        <Image
          width={400}
          height={600}
          src={movie.image}
          alt={movie.title}
          className="mb-2 border rounded-2xl w-[35rem] max-w-[400px]"
        />
      </div>
      <div className="max-w-[50rem] pt-[5rem]">
        <p className="text-sm text-muted dark:text-muted-foreground">
          <TimeConvert>{movie.releaseDate}</TimeConvert>
        </p>
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <div className="flex gap-1 items-center py-1 select-none">
          {movie.genres.map((category, index) => (
            <p
              key={index}
              className="bg-foreground/5 p-1 border rounded-md flex text-xs w-fit"
            >
              {category}
            </p>
          ))}
          <span className="text-sm text-muted">|</span>
          <p className="bg-foreground p-1 rounded-md flex text-xs min-w-6w  text-background">
            {" "}
            {movie.rating}
          </p>
        </div>

        <p className="max-w-[40rem] text-neutral-400">{movie.description}</p>
      </div>
    </div>
  </div>
  <div>
    <div className="mt-36">
      <h2 className="text-2xl font-semibold mb-4">Recommended Shows/Movies</h2>
    </div>
    <div className="recommendation-grid">
      {movie.recommendations.map((recommendation) => (
        <Link href={recommendation.url} key={recommendation.id} className="">
          <Image
            width={400}
            height={600}
            src={recommendation.image}
            alt={recommendation.title}
            className="mb-2 border rounded-xl !h-[500px] movie-card-image"
          />
          <h3 className="text-lg font-bold">{recommendation.title}</h3>
          <div className="flex">
            <p className="text-sm text-muted dark:text-muted-foreground flex gap-1">
              <DurationConvert duration={recommendation.duration} />· {""}
              {recommendation.type}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
</div>;
