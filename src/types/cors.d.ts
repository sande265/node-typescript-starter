declare type Origin = "all" | string | string[];
declare interface CorsOptions {
  credentials?: boolean;
  origin?: Origin;
  sameSite?: boolean;
}