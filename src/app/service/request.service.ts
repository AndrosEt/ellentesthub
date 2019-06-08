import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


export interface Category {
  id: any;
  url: string;
  html_url: string;
  position: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  locale: string;
  source_locale: string;
  outdated: boolean;
}

export interface CategoryList {
  categories: Category[];
  page: number;
  previous_page?: any;
  next_page?: any;
  per_page: number;
  page_count: number;
  count: number;
  sort_by: string;
  sort_order: string;
}

export interface Section {
  id: any;
  url: string;
  html_url: string;
  category_id: any;
  position: number;
  sorting: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  locale: string;
  source_locale: string;
  outdated: boolean;
  user_segment_id?: any;
  parent_section_id?: any;
  theme_template: string;
}

export interface SectionList {
  sections: Section[];
  page: number;
  previous_page?: any;
  next_page?: any;
  per_page: number;
  page_count: number;
  count: number;
  sort_by: string;
  sort_order: string;
}

export interface Article {
  id: any;
  url: string;
  html_url: string;
  author_id: any;
  comments_disabled: boolean;
  draft: boolean;
  promoted: boolean;
  position: number;
  vote_sum: number;
  vote_count: number;
  section_id: any;
  created_at: Date;
  updated_at: Date;
  name: string;
  title: string;
  source_locale: string;
  locale: string;
  outdated: boolean;
  outdated_locales: any[];
  edited_at: Date;
  user_segment_id?: any;
  permission_group_id: number;
  label_names: string[];
  body: string;
}

export interface ArticleList {
  count: number;
  next_page: string;
  page: number;
  page_count: number;
  per_page: number;
  previous_page?: any;
  articles: Article[];
  sort_by: string;
  sort_order: string;
}

export interface JsonData {
  items: ProductItem[]
}

export interface ProductItem {
  picUrl: string;
  name: string;
  keyword: string;
  url: string
}


@Injectable()
export class RequestService {

  constructor(private _http: HttpClient) {
  }

  // 这个是针对 guide 服务的请求服务，对接zendesk
  //https://whaleblue.zendesk.com/api/v2/help_center/categories.json

  _categories = 'categories.json';
  _sections = 'sections.json';
  _articles = 'articles.json';

  //  模块测试API url
  private baseUrl = `https://leverup.zendesk.com/api/v2/help_center`;
  private getCategoriesUrl = `${this.baseUrl}/${this._categories}`;
  private getSectionUrl = `${this.baseUrl}/${this._sections}`;
  private getArticlesUrl = `${this.baseUrl}/${this._articles}`;

  //获取category列表
  public getCategories(): Observable<CategoryList> {
    return this._http.get<CategoryList>(this.getCategoriesUrl);
  }

  //获取section列表（包含所有category的section）
  public getSections(): Observable<SectionList> {
    return this._http.get<SectionList>(this.getSectionUrl);
  }

  //获取文章列表
  public getArticles(): Observable<JsonData> {
    return this._http.get<JsonData>("https://raw.githubusercontent.com/Andros1993/web-test/master/data.json");
  }
}
