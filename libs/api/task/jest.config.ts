export default {
  displayName: 'task',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }]
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/api/task',
  moduleNameMapper: {
    '^@shared-interface$': '<rootDir>/../../shared/interfaces/src/index.ts',
    '^@public-api/model$': '<rootDir>/../api-model/src/index.ts'
  }
};
