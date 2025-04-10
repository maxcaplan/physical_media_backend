import type { GraphQLResolveInfo } from 'graphql';
import type { APIContext } from './context_type';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddAlbumInput = {
  artist_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  genre_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  label_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  length?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  producer_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  release_data?: InputMaybe<Scalars['String']['input']>;
  tracks?: InputMaybe<Array<AddTrackInput>>;
};

export type AddArtistInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  origin?: InputMaybe<Scalars['String']['input']>;
};

export type AddGenreInput = {
  name: Scalars['String']['input'];
};

export type AddLabelInput = {
  name: Scalars['String']['input'];
};

export type AddOwnedAlbumInput = {
  album_input: AddAlbumInput;
  condition?: InputMaybe<Condition>;
};

export type AddProducerInput = {
  name: Scalars['String']['input'];
};

export type AddTrackInput = {
  album_id: Scalars['Int']['input'];
  length?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  position: Scalars['Int']['input'];
  side?: InputMaybe<Scalars['Int']['input']>;
};

export type AddWishlistAlbumInput = {
  album_input: AddAlbumInput;
  listings?: InputMaybe<Array<Scalars['String']['input']>>;
  ranking?: InputMaybe<Scalars['Int']['input']>;
};

export type Album = {
  __typename?: 'Album';
  artists?: Maybe<Array<Artist>>;
  description?: Maybe<Scalars['String']['output']>;
  genres?: Maybe<Array<Genre>>;
  id: Scalars['Int']['output'];
  labels?: Maybe<Array<Label>>;
  length?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  producers?: Maybe<Array<Producer>>;
  release_date?: Maybe<Scalars['String']['output']>;
  tracks?: Maybe<Array<Track>>;
};

export type Artist = {
  __typename?: 'Artist';
  albums?: Maybe<Array<Album>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  origin?: Maybe<Scalars['String']['output']>;
};

export type ArtistAlbumInput = {
  album_id: Scalars['Int']['input'];
  artist_id: Scalars['Int']['input'];
};

export type ArtistAlbumRelation = {
  __typename?: 'ArtistAlbumRelation';
  album_id: Scalars['Int']['output'];
  artist_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
};

export type Condition =
  | 'G'
  | 'M'
  | 'NM'
  | 'P'
  | 'VG'
  | 'VGP';

export type Genre = {
  __typename?: 'Genre';
  albums?: Maybe<Array<Album>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type GenreAlbumInput = {
  album_id: Scalars['Int']['input'];
  genre_id: Scalars['Int']['input'];
};

export type GenreAlbumRelation = {
  __typename?: 'GenreAlbumRelation';
  album_id: Scalars['Int']['output'];
  genre_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
};

export type Label = {
  __typename?: 'Label';
  albums?: Maybe<Array<Album>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type LabelAlbumInput = {
  album_id: Scalars['Int']['input'];
  label_id: Scalars['Int']['input'];
};

export type LabelAlbumRelation = {
  __typename?: 'LabelAlbumRelation';
  album_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  label_id: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  add_artist: Artist;
  add_artist_to_album?: Maybe<ArtistAlbumRelation>;
  add_genre: Genre;
  add_genre_to_album?: Maybe<GenreAlbumRelation>;
  add_label: Label;
  add_label_to_album?: Maybe<LabelAlbumRelation>;
  add_owned_album: OwnedAlbum;
  add_producer: Producer;
  add_producer_to_album?: Maybe<ProducerAlbumRelation>;
  add_track: Track;
  add_wishlist_album: WishlistAlbum;
  delete_artist?: Maybe<Artist>;
  delete_genre?: Maybe<Genre>;
  delete_label?: Maybe<Label>;
  delete_owned_album?: Maybe<OwnedAlbum>;
  delete_producer?: Maybe<Producer>;
  delete_track?: Maybe<Track>;
  delete_wishlist_album?: Maybe<WishlistAlbum>;
  remove_artist_from_album?: Maybe<ArtistAlbumRelation>;
  remove_genre_from_album?: Maybe<GenreAlbumRelation>;
  remove_label_from_album?: Maybe<LabelAlbumRelation>;
  remove_producer_from_album?: Maybe<ProducerAlbumRelation>;
  update_artist?: Maybe<Artist>;
  update_genre?: Maybe<Genre>;
  update_label?: Maybe<Label>;
  update_owned_album?: Maybe<OwnedAlbum>;
  update_producer?: Maybe<Producer>;
  update_track?: Maybe<Track>;
  update_wishlist_album?: Maybe<WishlistAlbum>;
};


export type Mutationadd_artistArgs = {
  input: AddArtistInput;
};


export type Mutationadd_artist_to_albumArgs = {
  input: ArtistAlbumInput;
};


export type Mutationadd_genreArgs = {
  input: AddGenreInput;
};


export type Mutationadd_genre_to_albumArgs = {
  input: GenreAlbumInput;
};


export type Mutationadd_labelArgs = {
  input: AddLabelInput;
};


export type Mutationadd_label_to_albumArgs = {
  input: LabelAlbumInput;
};


export type Mutationadd_owned_albumArgs = {
  input: AddOwnedAlbumInput;
};


export type Mutationadd_producerArgs = {
  input: AddProducerInput;
};


export type Mutationadd_producer_to_albumArgs = {
  input: ProducerAlbumInput;
};


export type Mutationadd_trackArgs = {
  input: AddTrackInput;
};


export type Mutationadd_wishlist_albumArgs = {
  input: AddWishlistAlbumInput;
};


export type Mutationdelete_artistArgs = {
  id: Scalars['Int']['input'];
};


export type Mutationdelete_genreArgs = {
  id: Scalars['Int']['input'];
};


export type Mutationdelete_labelArgs = {
  id: Scalars['Int']['input'];
};


export type Mutationdelete_owned_albumArgs = {
  id: Scalars['Int']['input'];
};


export type Mutationdelete_producerArgs = {
  id: Scalars['Int']['input'];
};


export type Mutationdelete_trackArgs = {
  id: Scalars['Int']['input'];
};


export type Mutationdelete_wishlist_albumArgs = {
  id: Scalars['Int']['input'];
};


export type Mutationremove_artist_from_albumArgs = {
  input: ArtistAlbumInput;
};


export type Mutationremove_genre_from_albumArgs = {
  input: GenreAlbumInput;
};


export type Mutationremove_label_from_albumArgs = {
  input: LabelAlbumInput;
};


export type Mutationremove_producer_from_albumArgs = {
  input: ProducerAlbumInput;
};


export type Mutationupdate_artistArgs = {
  input: UpdateArtistInput;
};


export type Mutationupdate_genreArgs = {
  input: UpdateGenreInput;
};


export type Mutationupdate_labelArgs = {
  input: UpdateLabelInput;
};


export type Mutationupdate_owned_albumArgs = {
  input: UpdateOwnedAlbumInput;
};


export type Mutationupdate_producerArgs = {
  input: UpdateProducerInput;
};


export type Mutationupdate_trackArgs = {
  id: Scalars['Int']['input'];
  input: UpdateTrackInput;
};


export type Mutationupdate_wishlist_albumArgs = {
  input: UpdateWishlistAlbumInput;
};

export type OwnedAlbum = {
  __typename?: 'OwnedAlbum';
  album?: Maybe<Album>;
  condition?: Maybe<Condition>;
  id: Scalars['Int']['output'];
};

export type Producer = {
  __typename?: 'Producer';
  albums?: Maybe<Array<Album>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ProducerAlbumInput = {
  album_id: Scalars['Int']['input'];
  producer_id: Scalars['Int']['input'];
};

export type ProducerAlbumRelation = {
  __typename?: 'ProducerAlbumRelation';
  album_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  producer_id: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  artist?: Maybe<Artist>;
  artists: Array<Artist>;
  genre?: Maybe<Genre>;
  genres: Array<Genre>;
  label?: Maybe<Label>;
  labels: Array<Label>;
  owned_album?: Maybe<OwnedAlbum>;
  owned_albums: Array<OwnedAlbum>;
  producer?: Maybe<Producer>;
  producers: Array<Producer>;
  wishlist_album?: Maybe<WishlistAlbum>;
  wishlist_albums: Array<WishlistAlbum>;
};


export type QueryartistArgs = {
  id: Scalars['Int']['input'];
  options?: InputMaybe<QueryArtistOptions>;
};


export type QueryartistsArgs = {
  with_albums?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerygenreArgs = {
  id: Scalars['Int']['input'];
  options?: InputMaybe<QueryGenreOptions>;
};


export type QuerygenresArgs = {
  options?: InputMaybe<QueryGenreOptions>;
};


export type QuerylabelArgs = {
  id: Scalars['Int']['input'];
  options?: InputMaybe<QueryLabelOptions>;
};


export type QuerylabelsArgs = {
  options?: InputMaybe<QueryLabelOptions>;
};


export type Queryowned_albumArgs = {
  id: Scalars['Int']['input'];
};


export type QueryproducerArgs = {
  id: Scalars['Int']['input'];
  options?: InputMaybe<QueryProducerOptions>;
};


export type QueryproducersArgs = {
  options?: InputMaybe<QueryProducerOptions>;
};


export type Querywishlist_albumArgs = {
  id: Scalars['Int']['input'];
};

export type QueryArtistOptions = {
  with_albums?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryGenreOptions = {
  with_albums?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryLabelOptions = {
  with_albums?: InputMaybe<Scalars['Boolean']['input']>;
};

export type QueryProducerOptions = {
  with_albums?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Track = {
  __typename?: 'Track';
  album_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  length?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  side?: Maybe<Scalars['Int']['output']>;
};

export type UpdateAlbumInput = {
  artist_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  genre_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  label_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  length?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  producer_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  release_data?: InputMaybe<Scalars['String']['input']>;
  tracks?: InputMaybe<Array<UpdateTrackInput>>;
};

export type UpdateArtistInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  origin?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGenreInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateLabelInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOwnedAlbumInput = {
  album_input?: InputMaybe<UpdateAlbumInput>;
  condition?: InputMaybe<Condition>;
  id: Scalars['Int']['input'];
};

export type UpdateProducerInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTrackInput = {
  album_id?: InputMaybe<Scalars['Int']['input']>;
  length?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  side?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateWishlistAlbumInput = {
  album_input?: InputMaybe<UpdateAlbumInput>;
  id: Scalars['Int']['input'];
  listings?: InputMaybe<Array<Scalars['String']['input']>>;
  ranking?: InputMaybe<Scalars['Int']['input']>;
};

export type WishlistAlbum = {
  __typename?: 'WishlistAlbum';
  album?: Maybe<Album>;
  id: Scalars['Int']['output'];
  listings?: Maybe<Array<Scalars['String']['output']>>;
  ranking?: Maybe<Scalars['Int']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddAlbumInput: AddAlbumInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  AddArtistInput: AddArtistInput;
  AddGenreInput: AddGenreInput;
  AddLabelInput: AddLabelInput;
  AddOwnedAlbumInput: AddOwnedAlbumInput;
  AddProducerInput: AddProducerInput;
  AddTrackInput: AddTrackInput;
  AddWishlistAlbumInput: AddWishlistAlbumInput;
  Album: ResolverTypeWrapper<Album>;
  Artist: ResolverTypeWrapper<Artist>;
  ArtistAlbumInput: ArtistAlbumInput;
  ArtistAlbumRelation: ResolverTypeWrapper<ArtistAlbumRelation>;
  Condition: ResolverTypeWrapper<'P' | 'G' | 'VG' | 'VGP' | 'NM' | 'M'>;
  Genre: ResolverTypeWrapper<Genre>;
  GenreAlbumInput: GenreAlbumInput;
  GenreAlbumRelation: ResolverTypeWrapper<GenreAlbumRelation>;
  Label: ResolverTypeWrapper<Label>;
  LabelAlbumInput: LabelAlbumInput;
  LabelAlbumRelation: ResolverTypeWrapper<LabelAlbumRelation>;
  Mutation: ResolverTypeWrapper<{}>;
  OwnedAlbum: ResolverTypeWrapper<Omit<OwnedAlbum, 'condition'> & { condition?: Maybe<ResolversTypes['Condition']> }>;
  Producer: ResolverTypeWrapper<Producer>;
  ProducerAlbumInput: ProducerAlbumInput;
  ProducerAlbumRelation: ResolverTypeWrapper<ProducerAlbumRelation>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  QueryArtistOptions: QueryArtistOptions;
  QueryGenreOptions: QueryGenreOptions;
  QueryLabelOptions: QueryLabelOptions;
  QueryProducerOptions: QueryProducerOptions;
  Track: ResolverTypeWrapper<Track>;
  UpdateAlbumInput: UpdateAlbumInput;
  UpdateArtistInput: UpdateArtistInput;
  UpdateGenreInput: UpdateGenreInput;
  UpdateLabelInput: UpdateLabelInput;
  UpdateOwnedAlbumInput: UpdateOwnedAlbumInput;
  UpdateProducerInput: UpdateProducerInput;
  UpdateTrackInput: UpdateTrackInput;
  UpdateWishlistAlbumInput: UpdateWishlistAlbumInput;
  WishlistAlbum: ResolverTypeWrapper<WishlistAlbum>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddAlbumInput: AddAlbumInput;
  Int: Scalars['Int']['output'];
  String: Scalars['String']['output'];
  AddArtistInput: AddArtistInput;
  AddGenreInput: AddGenreInput;
  AddLabelInput: AddLabelInput;
  AddOwnedAlbumInput: AddOwnedAlbumInput;
  AddProducerInput: AddProducerInput;
  AddTrackInput: AddTrackInput;
  AddWishlistAlbumInput: AddWishlistAlbumInput;
  Album: Album;
  Artist: Artist;
  ArtistAlbumInput: ArtistAlbumInput;
  ArtistAlbumRelation: ArtistAlbumRelation;
  Genre: Genre;
  GenreAlbumInput: GenreAlbumInput;
  GenreAlbumRelation: GenreAlbumRelation;
  Label: Label;
  LabelAlbumInput: LabelAlbumInput;
  LabelAlbumRelation: LabelAlbumRelation;
  Mutation: {};
  OwnedAlbum: OwnedAlbum;
  Producer: Producer;
  ProducerAlbumInput: ProducerAlbumInput;
  ProducerAlbumRelation: ProducerAlbumRelation;
  Query: {};
  Boolean: Scalars['Boolean']['output'];
  QueryArtistOptions: QueryArtistOptions;
  QueryGenreOptions: QueryGenreOptions;
  QueryLabelOptions: QueryLabelOptions;
  QueryProducerOptions: QueryProducerOptions;
  Track: Track;
  UpdateAlbumInput: UpdateAlbumInput;
  UpdateArtistInput: UpdateArtistInput;
  UpdateGenreInput: UpdateGenreInput;
  UpdateLabelInput: UpdateLabelInput;
  UpdateOwnedAlbumInput: UpdateOwnedAlbumInput;
  UpdateProducerInput: UpdateProducerInput;
  UpdateTrackInput: UpdateTrackInput;
  UpdateWishlistAlbumInput: UpdateWishlistAlbumInput;
  WishlistAlbum: WishlistAlbum;
};

export type AlbumResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['Album'] = ResolversParentTypes['Album']> = {
  artists?: Resolver<Maybe<Array<ResolversTypes['Artist']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genres?: Resolver<Maybe<Array<ResolversTypes['Genre']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  labels?: Resolver<Maybe<Array<ResolversTypes['Label']>>, ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  producers?: Resolver<Maybe<Array<ResolversTypes['Producer']>>, ParentType, ContextType>;
  release_date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tracks?: Resolver<Maybe<Array<ResolversTypes['Track']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['Artist'] = ResolversParentTypes['Artist']> = {
  albums?: Resolver<Maybe<Array<ResolversTypes['Album']>>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  origin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistAlbumRelationResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['ArtistAlbumRelation'] = ResolversParentTypes['ArtistAlbumRelation']> = {
  album_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  artist_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConditionResolvers = EnumResolverSignature<{ G?: any, M?: any, NM?: any, P?: any, VG?: any, VGP?: any }, ResolversTypes['Condition']>;

export type GenreResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['Genre'] = ResolversParentTypes['Genre']> = {
  albums?: Resolver<Maybe<Array<ResolversTypes['Album']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenreAlbumRelationResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['GenreAlbumRelation'] = ResolversParentTypes['GenreAlbumRelation']> = {
  album_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  genre_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LabelResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['Label'] = ResolversParentTypes['Label']> = {
  albums?: Resolver<Maybe<Array<ResolversTypes['Album']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LabelAlbumRelationResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['LabelAlbumRelation'] = ResolversParentTypes['LabelAlbumRelation']> = {
  album_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  add_artist?: Resolver<ResolversTypes['Artist'], ParentType, ContextType, RequireFields<Mutationadd_artistArgs, 'input'>>;
  add_artist_to_album?: Resolver<Maybe<ResolversTypes['ArtistAlbumRelation']>, ParentType, ContextType, RequireFields<Mutationadd_artist_to_albumArgs, 'input'>>;
  add_genre?: Resolver<ResolversTypes['Genre'], ParentType, ContextType, RequireFields<Mutationadd_genreArgs, 'input'>>;
  add_genre_to_album?: Resolver<Maybe<ResolversTypes['GenreAlbumRelation']>, ParentType, ContextType, RequireFields<Mutationadd_genre_to_albumArgs, 'input'>>;
  add_label?: Resolver<ResolversTypes['Label'], ParentType, ContextType, RequireFields<Mutationadd_labelArgs, 'input'>>;
  add_label_to_album?: Resolver<Maybe<ResolversTypes['LabelAlbumRelation']>, ParentType, ContextType, RequireFields<Mutationadd_label_to_albumArgs, 'input'>>;
  add_owned_album?: Resolver<ResolversTypes['OwnedAlbum'], ParentType, ContextType, RequireFields<Mutationadd_owned_albumArgs, 'input'>>;
  add_producer?: Resolver<ResolversTypes['Producer'], ParentType, ContextType, RequireFields<Mutationadd_producerArgs, 'input'>>;
  add_producer_to_album?: Resolver<Maybe<ResolversTypes['ProducerAlbumRelation']>, ParentType, ContextType, RequireFields<Mutationadd_producer_to_albumArgs, 'input'>>;
  add_track?: Resolver<ResolversTypes['Track'], ParentType, ContextType, RequireFields<Mutationadd_trackArgs, 'input'>>;
  add_wishlist_album?: Resolver<ResolversTypes['WishlistAlbum'], ParentType, ContextType, RequireFields<Mutationadd_wishlist_albumArgs, 'input'>>;
  delete_artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType, RequireFields<Mutationdelete_artistArgs, 'id'>>;
  delete_genre?: Resolver<Maybe<ResolversTypes['Genre']>, ParentType, ContextType, RequireFields<Mutationdelete_genreArgs, 'id'>>;
  delete_label?: Resolver<Maybe<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<Mutationdelete_labelArgs, 'id'>>;
  delete_owned_album?: Resolver<Maybe<ResolversTypes['OwnedAlbum']>, ParentType, ContextType, RequireFields<Mutationdelete_owned_albumArgs, 'id'>>;
  delete_producer?: Resolver<Maybe<ResolversTypes['Producer']>, ParentType, ContextType, RequireFields<Mutationdelete_producerArgs, 'id'>>;
  delete_track?: Resolver<Maybe<ResolversTypes['Track']>, ParentType, ContextType, RequireFields<Mutationdelete_trackArgs, 'id'>>;
  delete_wishlist_album?: Resolver<Maybe<ResolversTypes['WishlistAlbum']>, ParentType, ContextType, RequireFields<Mutationdelete_wishlist_albumArgs, 'id'>>;
  remove_artist_from_album?: Resolver<Maybe<ResolversTypes['ArtistAlbumRelation']>, ParentType, ContextType, RequireFields<Mutationremove_artist_from_albumArgs, 'input'>>;
  remove_genre_from_album?: Resolver<Maybe<ResolversTypes['GenreAlbumRelation']>, ParentType, ContextType, RequireFields<Mutationremove_genre_from_albumArgs, 'input'>>;
  remove_label_from_album?: Resolver<Maybe<ResolversTypes['LabelAlbumRelation']>, ParentType, ContextType, RequireFields<Mutationremove_label_from_albumArgs, 'input'>>;
  remove_producer_from_album?: Resolver<Maybe<ResolversTypes['ProducerAlbumRelation']>, ParentType, ContextType, RequireFields<Mutationremove_producer_from_albumArgs, 'input'>>;
  update_artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType, RequireFields<Mutationupdate_artistArgs, 'input'>>;
  update_genre?: Resolver<Maybe<ResolversTypes['Genre']>, ParentType, ContextType, RequireFields<Mutationupdate_genreArgs, 'input'>>;
  update_label?: Resolver<Maybe<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<Mutationupdate_labelArgs, 'input'>>;
  update_owned_album?: Resolver<Maybe<ResolversTypes['OwnedAlbum']>, ParentType, ContextType, RequireFields<Mutationupdate_owned_albumArgs, 'input'>>;
  update_producer?: Resolver<Maybe<ResolversTypes['Producer']>, ParentType, ContextType, RequireFields<Mutationupdate_producerArgs, 'input'>>;
  update_track?: Resolver<Maybe<ResolversTypes['Track']>, ParentType, ContextType, RequireFields<Mutationupdate_trackArgs, 'id' | 'input'>>;
  update_wishlist_album?: Resolver<Maybe<ResolversTypes['WishlistAlbum']>, ParentType, ContextType, RequireFields<Mutationupdate_wishlist_albumArgs, 'input'>>;
};

export type OwnedAlbumResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['OwnedAlbum'] = ResolversParentTypes['OwnedAlbum']> = {
  album?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType>;
  condition?: Resolver<Maybe<ResolversTypes['Condition']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProducerResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['Producer'] = ResolversParentTypes['Producer']> = {
  albums?: Resolver<Maybe<Array<ResolversTypes['Album']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProducerAlbumRelationResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['ProducerAlbumRelation'] = ResolversParentTypes['ProducerAlbumRelation']> = {
  album_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  producer_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  artist?: Resolver<Maybe<ResolversTypes['Artist']>, ParentType, ContextType, RequireFields<QueryartistArgs, 'id'>>;
  artists?: Resolver<Array<ResolversTypes['Artist']>, ParentType, ContextType, Partial<QueryartistsArgs>>;
  genre?: Resolver<Maybe<ResolversTypes['Genre']>, ParentType, ContextType, RequireFields<QuerygenreArgs, 'id'>>;
  genres?: Resolver<Array<ResolversTypes['Genre']>, ParentType, ContextType, Partial<QuerygenresArgs>>;
  label?: Resolver<Maybe<ResolversTypes['Label']>, ParentType, ContextType, RequireFields<QuerylabelArgs, 'id'>>;
  labels?: Resolver<Array<ResolversTypes['Label']>, ParentType, ContextType, Partial<QuerylabelsArgs>>;
  owned_album?: Resolver<Maybe<ResolversTypes['OwnedAlbum']>, ParentType, ContextType, RequireFields<Queryowned_albumArgs, 'id'>>;
  owned_albums?: Resolver<Array<ResolversTypes['OwnedAlbum']>, ParentType, ContextType>;
  producer?: Resolver<Maybe<ResolversTypes['Producer']>, ParentType, ContextType, RequireFields<QueryproducerArgs, 'id'>>;
  producers?: Resolver<Array<ResolversTypes['Producer']>, ParentType, ContextType, Partial<QueryproducersArgs>>;
  wishlist_album?: Resolver<Maybe<ResolversTypes['WishlistAlbum']>, ParentType, ContextType, RequireFields<Querywishlist_albumArgs, 'id'>>;
  wishlist_albums?: Resolver<Array<ResolversTypes['WishlistAlbum']>, ParentType, ContextType>;
};

export type TrackResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['Track'] = ResolversParentTypes['Track']> = {
  album_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  length?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  side?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WishlistAlbumResolvers<ContextType = APIContext, ParentType extends ResolversParentTypes['WishlistAlbum'] = ResolversParentTypes['WishlistAlbum']> = {
  album?: Resolver<Maybe<ResolversTypes['Album']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  listings?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  ranking?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = APIContext> = {
  Album?: AlbumResolvers<ContextType>;
  Artist?: ArtistResolvers<ContextType>;
  ArtistAlbumRelation?: ArtistAlbumRelationResolvers<ContextType>;
  Condition?: ConditionResolvers;
  Genre?: GenreResolvers<ContextType>;
  GenreAlbumRelation?: GenreAlbumRelationResolvers<ContextType>;
  Label?: LabelResolvers<ContextType>;
  LabelAlbumRelation?: LabelAlbumRelationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OwnedAlbum?: OwnedAlbumResolvers<ContextType>;
  Producer?: ProducerResolvers<ContextType>;
  ProducerAlbumRelation?: ProducerAlbumRelationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Track?: TrackResolvers<ContextType>;
  WishlistAlbum?: WishlistAlbumResolvers<ContextType>;
};

