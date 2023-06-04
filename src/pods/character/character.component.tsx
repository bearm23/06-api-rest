import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@mui/material/Button';
import { TextFieldComponent, SelectComponent } from 'common/components';
import { formValidation } from './character.validations';
import { Character } from './character.vm';
import * as classes from './character.styles';
import { Box, Chip, Grid, Typography } from '@mui/material';
import { Lookup } from 'common/models';

interface Props {
  character: Character;
  status: Lookup[];
  gender: Lookup[];
  onSave: (character: Character) => void;
  goBack: () => void;
}

export const CharacterComponent: React.FunctionComponent<Props> = (props) => {
  const { character, status, gender, onSave, goBack } = props;

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        style={{ margin: '20px auto', minWidth: '200px' }}
        onClick={goBack}
      >
        Go back
      </Button>
      <Formik
        onSubmit={onSave}
        initialValues={character}
        enableReinitialize={true}
        validate={formValidation.validateForm}
      >
        {() => (
          <Form className={classes.root}>
            <Grid container>
              <Grid item sm={12} lg={4}>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="#F3F6F4"
                  p={2}
                  borderRadius={3}
                >
                  <Box
                    component="img"
                    sx={{
                      height: 300,
                      width: 300,
                    }}
                    alt={character.name}
                    src={character.image}
                  />
                  <TextFieldComponent name="name" label="Name" />
                  <SelectComponent
                    name="status"
                    label="Status"
                    items={status}
                  />
                  <TextFieldComponent
                    name="bestSentences"
                    label="Best sentences"
                    multiline={true}
                    minRows={3}
                    placeholder="The best sentences for this character"
                  />
                </Box>
              </Grid>
              <Grid
                item
                sm={12}
                lg={8}
                sx={{
                  paddingTop: { sm: '20px', lg: '0' },
                  paddingLeft: { lg: '20px' },
                }}
              >
                <Grid container>
                  <Grid
                    item
                    sm={12}
                    lg={6}
                    sx={{
                      paddingLeft: '20px',
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="#F3F6F4"
                      p={2}
                      borderRadius={3}
                      minHeight={282}
                    >
                      <Typography variant="body1" gutterBottom>
                        Info
                      </Typography>
                      <TextFieldComponent name="species" label="species" />
                      <TextFieldComponent name="type" label="type" />
                      <SelectComponent
                        name="gender"
                        label="gender"
                        items={gender}
                      />
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="#F3F6F4"
                      p={2}
                      borderRadius={3}
                      minHeight={282}
                      sx={{
                        marginTop: '20px',
                      }}
                    >
                      <Typography variant="body1" gutterBottom>
                        Episodes
                      </Typography>
                      <div
                        style={{
                          maxHeight: 222,
                          overflowY: 'auto',
                          margin: '0 auto',
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                        }}
                      >
                        {character.episode[0] !== ''
                          ? character.episode.map((episode) => (
                              <Chip
                                key={episode}
                                label={episode.split('/').pop()}
                                color="primary"
                                style={{ margin: 5, flex: '0 1 10%' }}
                              />
                            ))
                          : ''}
                      </div>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    sm={12}
                    lg={6}
                    sx={{
                      paddingLeft: '20px',
                    }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="#F3F6F4"
                      minHeight={282}
                      p={2}
                      borderRadius={3}
                    >
                      <Typography variant="body1" gutterBottom>
                        Origin
                      </Typography>
                      <TextFieldComponent
                        label="Origin"
                        name="origin.name"
                        variant="outlined"
                        style={{ marginBottom: 20 }}
                      />
                      <TextFieldComponent
                        label="URL"
                        name="origin.url"
                        variant="outlined"
                        style={{ marginBottom: 20 }}
                      />
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="center"
                      bgcolor="#F3F6F4"
                      p={2}
                      borderRadius={3}
                      minHeight={282}
                      sx={{
                        marginTop: '20px',
                      }}
                    >
                      <Typography variant="body1" gutterBottom>
                        Location
                      </Typography>
                      <TextFieldComponent
                        label="Name"
                        name="location.name"
                        variant="outlined"
                        style={{ marginBottom: 20 }}
                      />
                      <TextFieldComponent
                        label="URL"
                        name="location.url"
                        variant="outlined"
                        style={{ marginBottom: 20 }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ margin: '20px auto', minWidth: '200px' }}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
