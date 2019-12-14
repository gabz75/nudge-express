import IsAuthenticatedDirective from '~/graphql/directives/is-authenticated';
import PrivateFieldDirective from '~/graphql/directives/private-field';

export default {
  isAuthenticated: IsAuthenticatedDirective,
  privateField: PrivateFieldDirective,
};
