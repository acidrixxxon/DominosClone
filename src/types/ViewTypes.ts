export interface IViewState {
  modals: {
    auth: {
      visible: boolean;
    };
  };
  sort: {
    id: number;
    title: string;
  };
  category: number;
}
