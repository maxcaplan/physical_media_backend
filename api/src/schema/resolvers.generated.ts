/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { artist as Query_artist } from './artist/resolvers/Query/artist';
import    { artists as Query_artists } from './artist/resolvers/Query/artists';
import    { genre as Query_genre } from './genre/resolvers/Query/genre';
import    { genres as Query_genres } from './genre/resolvers/Query/genres';
import    { label as Query_label } from './label/resolvers/Query/label';
import    { labels as Query_labels } from './label/resolvers/Query/labels';
import    { owned_album as Query_owned_album } from './album/resolvers/Query/owned_album';
import    { owned_albums as Query_owned_albums } from './album/resolvers/Query/owned_albums';
import    { producer as Query_producer } from './producer/resolvers/Query/producer';
import    { producers as Query_producers } from './producer/resolvers/Query/producers';
import    { wishlist_album as Query_wishlist_album } from './album/resolvers/Query/wishlist_album';
import    { wishlist_albums as Query_wishlist_albums } from './album/resolvers/Query/wishlist_albums';
import    { add_artist as Mutation_add_artist } from './artist/resolvers/Mutation/add_artist';
import    { add_artist_to_album as Mutation_add_artist_to_album } from './relation/resolvers/Mutation/add_artist_to_album';
import    { add_genre as Mutation_add_genre } from './genre/resolvers/Mutation/add_genre';
import    { add_genre_to_album as Mutation_add_genre_to_album } from './relation/resolvers/Mutation/add_genre_to_album';
import    { add_label as Mutation_add_label } from './label/resolvers/Mutation/add_label';
import    { add_label_to_album as Mutation_add_label_to_album } from './relation/resolvers/Mutation/add_label_to_album';
import    { add_owned_album as Mutation_add_owned_album } from './album/resolvers/Mutation/add_owned_album';
import    { add_producer as Mutation_add_producer } from './producer/resolvers/Mutation/add_producer';
import    { add_producer_to_album as Mutation_add_producer_to_album } from './relation/resolvers/Mutation/add_producer_to_album';
import    { add_wishlist_album as Mutation_add_wishlist_album } from './album/resolvers/Mutation/add_wishlist_album';
import    { delete_artist as Mutation_delete_artist } from './artist/resolvers/Mutation/delete_artist';
import    { delete_genre as Mutation_delete_genre } from './genre/resolvers/Mutation/delete_genre';
import    { delete_label as Mutation_delete_label } from './label/resolvers/Mutation/delete_label';
import    { delete_owned_album as Mutation_delete_owned_album } from './album/resolvers/Mutation/delete_owned_album';
import    { delete_producer as Mutation_delete_producer } from './producer/resolvers/Mutation/delete_producer';
import    { delete_wishlist_album as Mutation_delete_wishlist_album } from './album/resolvers/Mutation/delete_wishlist_album';
import    { remove_artist_from_album as Mutation_remove_artist_from_album } from './relation/resolvers/Mutation/remove_artist_from_album';
import    { remove_genre_from_album as Mutation_remove_genre_from_album } from './relation/resolvers/Mutation/remove_genre_from_album';
import    { remove_label_from_album as Mutation_remove_label_from_album } from './relation/resolvers/Mutation/remove_label_from_album';
import    { remove_producer_from_album as Mutation_remove_producer_from_album } from './relation/resolvers/Mutation/remove_producer_from_album';
import    { update_artist as Mutation_update_artist } from './artist/resolvers/Mutation/update_artist';
import    { update_genre as Mutation_update_genre } from './genre/resolvers/Mutation/update_genre';
import    { update_label as Mutation_update_label } from './label/resolvers/Mutation/update_label';
import    { update_owned_album as Mutation_update_owned_album } from './album/resolvers/Mutation/update_owned_album';
import    { update_producer as Mutation_update_producer } from './producer/resolvers/Mutation/update_producer';
import    { update_wishlist_album as Mutation_update_wishlist_album } from './album/resolvers/Mutation/update_wishlist_album';
import    { Album } from './album/resolvers/Album';
import    { Artist } from './artist/resolvers/Artist';
import    { ArtistAlbumRelation } from './relation/resolvers/ArtistAlbumRelation';
import    { Genre } from './genre/resolvers/Genre';
import    { GenreAlbumRelation } from './relation/resolvers/GenreAlbumRelation';
import    { Label } from './label/resolvers/Label';
import    { LabelAlbumRelation } from './relation/resolvers/LabelAlbumRelation';
import    { OwnedAlbum } from './album/resolvers/OwnedAlbum';
import    { Producer } from './producer/resolvers/Producer';
import    { ProducerAlbumRelation } from './relation/resolvers/ProducerAlbumRelation';
import    { Track } from './album/resolvers/Track';
import    { WishlistAlbum } from './album/resolvers/WishlistAlbum';
    export const resolvers: Resolvers = {
      Query: { artist: Query_artist,artists: Query_artists,genre: Query_genre,genres: Query_genres,label: Query_label,labels: Query_labels,owned_album: Query_owned_album,owned_albums: Query_owned_albums,producer: Query_producer,producers: Query_producers,wishlist_album: Query_wishlist_album,wishlist_albums: Query_wishlist_albums },
      Mutation: { add_artist: Mutation_add_artist,add_artist_to_album: Mutation_add_artist_to_album,add_genre: Mutation_add_genre,add_genre_to_album: Mutation_add_genre_to_album,add_label: Mutation_add_label,add_label_to_album: Mutation_add_label_to_album,add_owned_album: Mutation_add_owned_album,add_producer: Mutation_add_producer,add_producer_to_album: Mutation_add_producer_to_album,add_wishlist_album: Mutation_add_wishlist_album,delete_artist: Mutation_delete_artist,delete_genre: Mutation_delete_genre,delete_label: Mutation_delete_label,delete_owned_album: Mutation_delete_owned_album,delete_producer: Mutation_delete_producer,delete_wishlist_album: Mutation_delete_wishlist_album,remove_artist_from_album: Mutation_remove_artist_from_album,remove_genre_from_album: Mutation_remove_genre_from_album,remove_label_from_album: Mutation_remove_label_from_album,remove_producer_from_album: Mutation_remove_producer_from_album,update_artist: Mutation_update_artist,update_genre: Mutation_update_genre,update_label: Mutation_update_label,update_owned_album: Mutation_update_owned_album,update_producer: Mutation_update_producer,update_wishlist_album: Mutation_update_wishlist_album },
      
      Album: Album,
Artist: Artist,
ArtistAlbumRelation: ArtistAlbumRelation,
Genre: Genre,
GenreAlbumRelation: GenreAlbumRelation,
Label: Label,
LabelAlbumRelation: LabelAlbumRelation,
OwnedAlbum: OwnedAlbum,
Producer: Producer,
ProducerAlbumRelation: ProducerAlbumRelation,
Track: Track,
WishlistAlbum: WishlistAlbum
    }