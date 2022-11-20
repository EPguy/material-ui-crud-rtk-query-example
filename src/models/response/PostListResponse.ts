import {Post} from "../Post";

export interface PostListResponse {
    page: number,
    rowsPerPage: number,
    count: number,
    posts: Post[]
}
