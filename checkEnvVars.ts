const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_ROOT',
  'NEXT_PUBLIC_URL',

  'NEXT_PUBLIC_API',
  'NEXT_PUBLIC_API_PROJECT',

  'DATABASE_URL',
];

const checkEnvVars = () => {
  console.error('\x1b[37m- \x1b[33mchecking env...\x1b[37m');

  const missingEnvVars = REQUIRED_ENV_VARS.filter(
    (envVar) => !(envVar in process.env),
  );

  if (missingEnvVars.length > 0) {
    console.error(
      '\x1b[37m- \x1b[31merror \x1b[37mthe following env was not found:\x1b[37m',
    );
    missingEnvVars.forEach((envVar, index) => {
      console.table(`\x1b[31m  ${index + 1}. ${envVar}\x1b[37m`);
    });
    process.exit(1);
  } else {
    console.log('\x1b[37m- \x1b[32menv lengkap gan!\x1b[37m');
  }
};

module.exports = checkEnvVars;
