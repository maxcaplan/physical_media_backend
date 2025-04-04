/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { artist as Query_artist } from './artist/resolvers/Query/artist';
import    { genres as Query_genres } from './genre/resolvers/Query/genres';
import    { ownedAlbums as Query_ownedAlbums } from './album/resolvers/Query/ownedAlbums';
import    { wishlistAlbums as Query_wishlistAlbums } from './album/resolvers/Query/wishlistAlbums';
import    { addArtist as Mutation_addArtist } from './artist/resolvers/Mutation/addArtist';
import    { addGenre as Mutation_addGenre } from './genre/resolvers/Mutation/addGenre';
import    { addOwnedAlbum as Mutation_addOwnedAlbum } from './album/resolvers/Mutation/addOwnedAlbum';
import    { addWishlistAlbum as Mutation_addWishlistAlbum } from './album/resolvers/Mutation/addWishlistAlbum';
import    { deleteArtist as Mutation_deleteArtist } from './artist/resolvers/Mutation/deleteArtist';
import    { deleteGenre as Mutation_deleteGenre } from './genre/resolvers/Mutation/deleteGenre';
import    { deleteOwnedAlbum as Mutation_deleteOwnedAlbum } from './album/resolvers/Mutation/deleteOwnedAlbum';
import    { deleteWishlistAlbum as Mutation_deleteWishlistAlbum } from './album/resolvers/Mutation/deleteWishlistAlbum';
import    { updateArtist as Mutation_updateArtist } from './artist/resolvers/Mutation/updateArtist';
import    { updateGenre as Mutation_updateGenre } from './genre/resolvers/Mutation/updateGenre';
import    { updateOwnedAlbum as Mutation_updateOwnedAlbum } from './album/resolvers/Mutation/updateOwnedAlbum';
import    { updateWishlistAlbum as Mutation_updateWishlistAlbum } from './album/resolvers/Mutation/updateWishlistAlbum';
import    { Album } from './album/resolvers/Album';
import    { Artist } from './artist/resolvers/Artist';
import    { ArtistMutationResponse } from './artist/resolvers/ArtistMutationResponse';
import    { Genre } from './genre/resolvers/Genre';
import    { GenreMutationResponse } from './genre/resolvers/GenreMutationResponse';
import    { OwnedAlbum } from './album/resolvers/OwnedAlbum';
import    { OwnedAlbumMutationResponse } from './album/resolvers/OwnedAlbumMutationResponse';
import    { Track } from './album/resolvers/Track';
import    { WishlistAlbum } from './album/resolvers/WishlistAlbum';
import    { WishlistAlbumMutationResponse } from './album/resolvers/WishlistAlbumMutationResponse';
    export const resolvers: Resolvers = {
      Query: { artist: Query_artist,genres: Query_genres,ownedAlbums: Query_ownedAlbums,wishlistAlbums: Query_wishlistAlbums },
      Mutation: { addArtist: Mutation_addArtist,addGenre: Mutation_addGenre,addOwnedAlbum: Mutation_addOwnedAlbum,addWishlistAlbum: Mutation_addWishlistAlbum,deleteArtist: Mutation_deleteArtist,deleteGenre: Mutation_deleteGenre,deleteOwnedAlbum: Mutation_deleteOwnedAlbum,deleteWishlistAlbum: Mutation_deleteWishlistAlbum,updateArtist: Mutation_updateArtist,updateGenre: Mutation_updateGenre,updateOwnedAlbum: Mutation_updateOwnedAlbum,updateWishlistAlbum: Mutation_updateWishlistAlbum },
      
      Album: Album,
Artist: Artist,
ArtistMutationResponse: ArtistMutationResponse,
Genre: Genre,
GenreMutationResponse: GenreMutationResponse,
OwnedAlbum: OwnedAlbum,
OwnedAlbumMutationResponse: OwnedAlbumMutationResponse,
Track: Track,
WishlistAlbum: WishlistAlbum,
WishlistAlbumMutationResponse: WishlistAlbumMutationResponse
    }