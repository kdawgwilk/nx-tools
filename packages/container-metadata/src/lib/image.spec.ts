import { Image, Transform } from './image';

describe('transform', () => {
  beforeAll(() => {
    jest.spyOn(console, 'info').mockImplementation(() => true);
    jest.spyOn(console, 'log').mockImplementation(() => true);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  // prettier-ignore
  test.each([
    [
      [
        `name/foo`
      ],
      [
        {
          name: `name/foo`,
          enable: true,
        }
      ] as Image[],
      false
    ],
    [
      [
        `name/foo,name/bar`
      ],
      [
        {
          name: `name/foo`,
          enable: true,
        },
        {
          name: `name/bar`,
          enable: true,
        }
      ] as Image[],
      false
    ],
    [
      [
        `name/foo`,
        `name/bar`
      ],
      [
        {
          name: `name/foo`,
          enable: true,
        },
        {
          name: `name/bar`,
          enable: true,
        }
      ] as Image[],
      false
    ],
    [
      [
        `name=name/bar`,
        `name/foo,enable=false`,
        `name=ghcr.io/UserName/Foo,enable=true`
      ],
      [
        {
          name: `name/bar`,
          enable: true,
        },
        {
          name: `name/foo`,
          enable: false,
        },
        {
          name: `ghcr.io/UserName/Foo`,
          enable: true,
        },
      ] as Image[],
      false
    ],
    [
      [`value=name/foo`], undefined, true
    ],
    [
      [`name/foo,enable=bar`], undefined, true
    ],
    [
      [`name/foo,bar=baz`], undefined, true
    ],
    [
      [`name=,enable=true`], undefined, true
    ],
    [
      [`name/foo,name=name/bar,enable=true`], undefined, true
    ]
  ])('given %p', async (l: string[], expected: Image[] | undefined, invalid: boolean) => {
    try {
      const images = Transform(l);
      expect(images).toEqual(expected);
    } catch (err) {
      if (!invalid) {
        console.error(err);
      }
      expect(true).toBe(invalid);
    }
  });
});
