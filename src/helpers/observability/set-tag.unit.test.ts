/* eslint-disable @typescript-eslint/no-var-requires */
import tracer, { Scope, Span } from 'dd-trace';
import { mocked } from 'jest-mock';
import { setTag } from '.';
import { mock } from 'jest-mock-extended';

jest.mock('dd-trace');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('set tag', () => {
  it('sets a tag on the active span', () => {
    const mockScope = mock<Scope>();
    const mockSpan = mock<Span>();

    mockScope.active.mockReturnValue(mockSpan);
    mocked(tracer.scope).mockReturnValue(mockScope);
    setTag('tag-name', 'tag-value');
    expect(mockSpan.setTag).toHaveBeenCalledWith('tag-name', 'tag-value');
  });

  it('throws an error if no span is returned', () => {
    const mockScope = mock<Scope>();
    mockScope.active.mockReturnValue(null);
    mocked(tracer.scope).mockReturnValue(mockScope);

    expect(() => setTag('tag-name', 'tag-value')).toThrow(new Error('Active span not available'));
  });

  it('calls init before setTag is called', () => {
    jest.isolateModules(() => {
      const mockScope = mock<Scope>();
      const mockSpan = mock<Span>();
      mockScope.active.mockReturnValue(mockSpan);
      jest.doMock('dd-trace');
      const { default: isolatedTracer } = require('dd-trace');
      mocked(isolatedTracer.scope).mockReturnValue(mockScope);
      const { setTag: isolatedSetTag } = require('.');
      isolatedSetTag('tag-name', 'tag-value');
      expect(mocked(isolatedTracer.init).mock.invocationCallOrder[0]).toBeLessThan(
        mockSpan.setTag.mock.invocationCallOrder[0] || 0
      );
    });
  });

  it('only ever calls init once regardless of how many times setTag is called', () => {
    jest.isolateModules(() => {
      const mockScope = mock<Scope>();
      const mockSpan = mock<Span>();
      mockScope.active.mockReturnValue(mockSpan);
      jest.doMock('dd-trace');
      const { default: isolatedTracer } = require('dd-trace');
      mocked(isolatedTracer.scope).mockReturnValue(mockScope);
      const { setTag: isolatedSetTag } = require('.');
      isolatedSetTag('tag-name', 'tag-value');
      isolatedSetTag('tag-name', 'tag-value');
      expect(mocked(isolatedTracer.init)).toHaveBeenCalledTimes(1);
    });
  });

  it('only ever calls init once even if setTag is required multiple times', () => {
    jest.isolateModules(() => {
      const mockScope = mock<Scope>();
      const mockSpan = mock<Span>();
      mockScope.active.mockReturnValue(mockSpan);
      jest.doMock('dd-trace');
      const { default: isolatedTracer } = require('dd-trace');
      mocked(isolatedTracer.scope).mockReturnValue(mockScope);
      const { setTag: isolatedSetTag1 } = require('.');
      const { setTag: isolatedSetTag2 } = require('.');
      isolatedSetTag1('tag-name', 'tag-value');
      isolatedSetTag2('tag-name', 'tag-value');
      expect(mocked(isolatedTracer.init)).toHaveBeenCalledTimes(1);
    });
  });
});
