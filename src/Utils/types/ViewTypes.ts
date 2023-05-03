export interface IViewState {
  modals: {
    auth: {
      visible: boolean;
    };
  };
  analytics: 'month' | 'year';
  sort: {
    id: number;
    title: string;
  };
  category: number;
  loaders: {
    createOrderLoader: boolean;
    globalLoader: boolean;
  };
}
