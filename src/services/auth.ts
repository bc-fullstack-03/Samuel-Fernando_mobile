function generateAuthHeader(token: string, isFormData?: boolean) {
  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFormData) && { 'Content-Type': 'multipart/form-data' },
    },
  };

  return authHeader;
}

export { generateAuthHeader };
