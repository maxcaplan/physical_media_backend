import common from "./common.graphql" with { type: "text" }
import album from "./album.graphql" with { type: "text" }
import artist from "./artist.graphql" with { type: "text" }
import genre from "./genre.graphql" with { type: "text" }

export const type_defs: string[] = [common, album, artist, genre]
