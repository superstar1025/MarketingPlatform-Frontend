import {
  QueryResult,
  MutationResult,
  MutationFn,
  FetchResult,
  OperationVariables
} from "react-apollo";
import { RenderFn } from "create-react-context";

export type DropDownItem = { label: string; value: any };
export type DropDownItems = DropDownItem[];
export type ApolloResult = QueryResult<any> | MutationResult<any>;

export interface IMapper {
  render: RenderFn<any>;
}

export interface IMutationRenderProp {
  mutation: MutationFn<any, OperationVariables>;
  result: MutationResult<any>;
}

export interface ComposedMutations {
  [key: string]: IMutationRenderProp;
}

export type MutationResultValue = void | FetchResult<{}, Record<string, any>>;


export interface DomainNode {
  id: string;
  label: string;
  company?: {
    name: string;
  };
}

export type AnyObject = {
  [key: string]: any;
};

export interface DomainNodeEdge {
  node?: DomainNode;
}

export interface DomainNodeConnection {
  edges: DomainNodeEdge[];
}

export interface CreateDomainPayload {
  domain?: DomainNode;
}

export interface IMapper {
  render: RenderFn<any>;
}

export interface MutationRenderProp<TData, OperationVariables> {
  mutation: MutationFn<TData, OperationVariables>;
  result: MutationResult<TData>;
}

