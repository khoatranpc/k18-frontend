import React from 'react';
import { ROLE_USER } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';
import EmptyLayout from '@/layouts/empty';

const GoogleRedirectPage = CreatePage('Google/Redirect', [ROLE_USER.TE], EmptyLayout);
export default GoogleRedirectPage;