                    <Button 
                      onClick={() => notSil(index)}
                      size="small"
                      variant="contained"
                      className="christmas-button"
                      sx={{ 
                        minWidth: 'auto',
                        px: 2,
                        py: 0.5,
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        '&::before': {
                          content: '"🗑️ "',
                        },
                      }}
                    >
                      Sil
                    </Button> 